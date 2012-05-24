/*
 * Script：
 *              贾睿之
 * Email：
 *             jiaruizhi@360buy.com
 *
 * Description：
 *            扩展 Array 对象，
 *            提供：Stack 的 Array 实现。
 * Date：
 *          12:22 12/3/2011
 */

//初始化 NIL;
var NIL = null;

Array.prototype.top = 0;
Array.prototype.stackEmpty = function () {
    if (this.top == 0) {
        return true;
    } else {
        return false;
    }
};
Array.prototype.pushv1 = function (x) {
    this.top = this.top + 1;
    this[this.top] = x;
};
Array.prototype.popv1 = function () {
    if (this.stackEmpty()) {
        console.error('underflow');
    } else {
        this.top = this.top - 1;
        return this[this.top + 1];
    }
};


/*
 * head: 队列的头;
 * tail: 指向新元素将会被插入的位置;
 * 初始化时，head = tail = 0;
 * 当 head = tail 时，队列为空;
 * */
Array.prototype.head = 0;
Array.prototype.tail = 0;
Array.prototype.enqueue = function (x) {
    this[this.tail] = x;
    if (this.tail == this.length - 1) {
        this.tail = 0;
    } else {
        this.tail++;
    }
};
Array.prototype.dequeue = function () {
    var x = this[this.head];
    if (this.head == this.length - 1) {
        this.head = 1;
    } else {
        this.head++;
    }
    return x;
};

/*
 *链表
 */
function Linked(k) {
    //关键字域 (key field)
    this.key = k;
    //指针域 (pointer fields)
    this.next = null;
    this.prev = null;
}
function LinkedList() {
    //哨兵(sentinel , a dummy object )
    this.sentinel = new Linked(null);
    var currentLinked = this.sentinel;
    for (i = 0; i < arguments.length; i++) {
        currentLinked.next = new Linked(arguments[i]);
        currentLinked.next.prev = currentLinked;
        currentLinked = currentLinked.next;
        //currentLinked = currentLinked.next;
    }
    this.sentinel.prev = currentLinked;
    currentLinked.next = this.sentinel;

    //the procedure SEARCH finds the first element with key K in list L by a simple linear search, returning a pointer to this elemeng;
    this.search = function (k) {
        var x = this.sentinel.next;
        while (x != this.sentinel && x.key != k) {
            x = x.next;
        }
        return x;
    };
    //将 x 插入到链表的前端。
    this.insert = function (x) {
        //x 的右变关系设置
        x.next = this.sentinel.next;
        this.sentinel.next.prev = x;
        //x 的左变关系设置
        this.sentinel.next = x;
        x.prev = this.sentinel;
    };
    //删除，
    this.remove = function (x) {
        x.prev.next = x.next;
        x.next.prev = x.prev;
    };
    this.keys = function () {
        var keys = new Array();
        var tempLinked = this.sentinel;

        do
        {
            keys.push(tempLinked.key == null ? 'NIL' : tempLinked.key);
            tempLinked = tempLinked.next;
        }
        while (tempLinked.key)

        return keys;
    };
}
function LinkedListNotSentinel(k) {
    //关键字域 (key field)
    this.key = k;
    //指针域 (pointer fields)
    this.next = null;
    this.prev = null;
    this.head = function () {
        return this.prev == null ? this : this.prev.head();
    };
    //the procedure SEARCH finds the first element with key K in list L by a simple linear search, returning a pointer to this elemeng;
    this.search = function (k) {
        var x = this.head();
        while (x != null && x.key != k) {
            x = x.next;
        }
        return x;
    };

    //将 x 插入到链表的前端。
    this.insert = function (x) {
        x.next = this.head();
        if (x.next != null) {
            this.head().prev = x;
        }
        x.prev = null;
    };

    //删除，
    this.remove = function (x) {
        if (x.prev != null) {
            x.prev.next = x.next;
        } else {
            //因为 head  采用动态方式获取，所以不需要这一步
            //this.head = this.next;
        }
        if (x.next != null) {
            x.next.prev = x.prev;
        }
    };

    this.keys = function () {
//        if (this.key != this.head().key) {
//            return this.head().keys();
//        }
        var keys = new Array();
        keys.push(this.key);
        if (this.next) {
            keys = keys.concat(this.next.keys());
        }
        return keys;
    };
}


