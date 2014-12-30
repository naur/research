package org.naur.research.labs.concurrency.stampedlock;


import org.naur.common.patterns.Enable;
import org.naur.research.labs.Sub;

import java.util.Arrays;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;

@Enable(false)
public class PerfTest extends Sub {
    private static final long TEST_COOL_OFF_MS = 1000;
    private static final ExecutorService EXECUTOR = Executors.newCachedThreadPool();

    private static final Spaceship[] SPACESHIPS =
            {
                    new SynchronizedSpaceship(),
                    new ReadWriteLockSpaceShip(),
                    new ReentrantLockSpaceship(),
                    new StampedLockSpaceship(),
                    new LockFreeSpaceship(),
            };

    private static int NUM_WRITERS;
    private static int NUM_READERS;
    private static long TEST_DURATION_MS;


    @Override
    public void execute() throws Exception {
        PerfTest.main(new String[]{"100", "100", "100"});
    }

    public static void main(final String[] args) throws Exception {
        NUM_READERS = Integer.parseInt(args[0]);
        NUM_WRITERS = Integer.parseInt(args[1]);
        TEST_DURATION_MS = Long.parseLong(args[2]);

        for (int i = 0; i < 5; i++) {
            logger.info("*** Run - " + i);
            for (final Spaceship SPACESHIP : SPACESHIPS) {
                System.gc();
                Thread.sleep(TEST_COOL_OFF_MS);

                perfRun(SPACESHIP);
            }
        }

        EXECUTOR.shutdown();
    }

    public static void perfRun(final Spaceship spaceship) throws Exception {
        final Results results = new Results();
        final CyclicBarrier startBarrier = new CyclicBarrier(NUM_READERS + NUM_WRITERS + 1);
        final CountDownLatch finishLatch = new CountDownLatch(NUM_READERS + NUM_WRITERS);
        final AtomicBoolean runningFlag = new AtomicBoolean(true);

        for (int i = 0; i < NUM_WRITERS; i++) {
            EXECUTOR.execute(new WriterRunner(i, results, spaceship, runningFlag, startBarrier, finishLatch));
        }

        for (int i = 0; i < NUM_READERS; i++) {
            EXECUTOR.execute(new ReaderRunner(i, results, spaceship, runningFlag, startBarrier, finishLatch));
        }

        //等待所有 READER 和 WRITER 线程都到达后，再一起执行。
        awaitBarrier(startBarrier);

        Thread.sleep(TEST_DURATION_MS);
        runningFlag.set(false);

        //等待所有 READER 和 WRITER 线程都执行完后，在执行下面的代码。
        finishLatch.await();

        System.out.format("%d readers %d writers %22s %s\n",
                NUM_READERS, NUM_WRITERS,
                spaceship.getClass().getSimpleName(),
                results);
    }

    public static void awaitBarrier(final CyclicBarrier barrier) {
        try {
            barrier.await();
        } catch (final Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public static class Results {
        long[] reads = new long[NUM_READERS];
        long[] moves = new long[NUM_WRITERS];

        long[] readAttempts = new long[NUM_READERS];
        long[] observedMoves = new long[NUM_READERS];
        long[] moveAttempts = new long[NUM_WRITERS];

        @Override
        public String toString() {
            long totalReads = 0;
            for (final long v : reads) {
                totalReads += v;
            }
            final String readsSummary = String.format("%,d:", totalReads);

            long totalMoves = 0;
            for (final long v : moves) {
                totalMoves += v;
            }
            final String movesSummary = String.format("%,d:", totalMoves);

            return
                    "reads=" + readsSummary + Arrays.toString(reads) +
                            " moves=" + movesSummary + Arrays.toString(moves) +
                            " readAttempts=" + Arrays.toString(readAttempts) +
                            " moveAttempts=" + Arrays.toString(moveAttempts) +
                            " observedMoves=" + Arrays.toString(observedMoves);
        }
    }

    public static class WriterRunner implements Runnable {
        private final int id;
        private final Results results;
        private final Spaceship spaceship;
        private final AtomicBoolean runningFlag;
        private final CyclicBarrier barrier;
        private final CountDownLatch latch;

        public WriterRunner(final int id, final Results results, final Spaceship spaceship,
                            final AtomicBoolean runningFlag, final CyclicBarrier barrier, final CountDownLatch latch) {
            this.id = id;
            this.results = results;
            this.spaceship = spaceship;
            this.runningFlag = runningFlag;
            this.barrier = barrier;
            this.latch = latch;
        }

        @Override
        public void run() {
            awaitBarrier(barrier);

            long movesCounter = 0;
            long movedAttemptsCount = 0;

            while (runningFlag.get()) {
                movedAttemptsCount += spaceship.move(1, 1);

                ++movesCounter;
            }

            results.moveAttempts[id] = movedAttemptsCount;
            results.moves[id] = movesCounter;

            latch.countDown();
        }
    }

    public static class ReaderRunner implements Runnable {
        private final int id;
        private final Results results;
        private final Spaceship spaceship;
        private final AtomicBoolean runningFlag;
        private final CyclicBarrier barrier;
        private final CountDownLatch latch;

        public ReaderRunner(final int id, final Results results, final Spaceship spaceship,
                            final AtomicBoolean runningFlag, final CyclicBarrier barrier, final CountDownLatch latch) {
            this.id = id;
            this.results = results;
            this.spaceship = spaceship;
            this.runningFlag = runningFlag;
            this.barrier = barrier;
            this.latch = latch;
        }

        @Override
        public void run() {
            awaitBarrier(barrier);

            int[] currentCoordinates = new int[]{0, 0};
            int[] lastCoordinates = new int[]{0, 0};

            long readsCount = 0;
            long readAttemptsCount = 0;
            long observedMoves = 0;

            while (runningFlag.get()) {
                readAttemptsCount += spaceship.readPosition(currentCoordinates);

                if (lastCoordinates[0] != currentCoordinates[0] ||
                        lastCoordinates[1] != currentCoordinates[1]) {
                    ++observedMoves;
                    lastCoordinates[0] = currentCoordinates[0];
                    lastCoordinates[1] = currentCoordinates[1];
                }

                ++readsCount;
            }

            results.reads[id] = readsCount;
            results.readAttempts[id] = readAttemptsCount;
            results.observedMoves[id] = observedMoves;

            latch.countDown();
        }
    }
}
