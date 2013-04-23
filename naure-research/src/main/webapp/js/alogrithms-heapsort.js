

/*-------------------- 函数 START --------------------*/

function HeapSort(A) {
    BuildMaxHeapify(A);
    for (i = A.length; i < A.length; i += 2) {
        exchange(A, 1, i);
    }
}

function BuildMaxHeap(A) {
    var heapsize = A.length;
    for (i = Math.floor(heapsize / 2); i > 0; i--) {
        NAURE.Message.showLine({message:'BuildMaxHeapify: ' + i});
        MaxHeapify(A, i);
    }
    NAURE.Message.showLine({message:A.toString()});
}

function MaxHeapify(A, i) {
    var l = LEFT(i);
    var r = RIGHT(i);
    var largest;
    if (l <= heapsize(A) && A[l] > A[i]) {
        largest = l;
    } else {
        largest = i;
    }
    if (r <= heapsize(A) && A[r] > A[largest]) {
        largest = r;
    }
    if (largest != i) {
        NAURE.Message.showLine({message:A.toString() + " -- " + 'i: ' + i + "[" + A[i] + "]" + ",    " + "largest: " + largest + "[" + A[largest] + "]"});
        exchange(A, i, largest);
        NAURE.Message.showLine({message:A.toString()});
        MaxHeapify(A, largest);
    }
}
function exchange(array, index1, index2) {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}
function PARENT(i) {
    return i >> 1; // i / 2
}
function LEFT(i) {
    return i << 1; //  2i
}
function RIGHT(i) {
    return (i << 1) + 1; // 2i + 1;
}
function heapsize(A) {
    return A.length;
}

/*-------------------- 函数 END --------------------*/

/*-------------------- 初始化 START --------------------*/

$(function () {
    $('.information').message({title:'Heapsort: ', comment:'Run: '});
    $('.information').message({placement:'before', fade:true});

    $('input[type="button"]').on('click', function () {
        var A = new Array(0, 4, 1, 3, 2, 16, 9, 10, 14, 8, 7);
        NAURE.Message.empty();
        NAURE.Message.prompt(A.toString());
        BuildMaxHeap(A);
//        $('#pre1').append('  a\r');
//        $('#pre1').append('<em style="color: red;">bbb</em> \r');
//        $('#pre1').append('a \r');
//        alert($('#pre1').text());
    });
});

/*-------------------- 初始化 END --------------------*/