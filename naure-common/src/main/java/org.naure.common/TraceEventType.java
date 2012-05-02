package org.naure.common;

/**
 * Created with IntelliJ IDEA.
 * User: jiaruizhi
 * Date: 5/2/12
 * Time: 9:59 AM
 * To change this template use File | Settings | File Templates.
 */
//http://msdn.microsoft.com/zh-cn/library/system.diagnostics.traceeventtype(v=vs.90).aspx
public enum TraceEventType {
    Critical(1),    //错误或应用程序崩溃。
    Error(2),     //可恢复的错误。
    Warning(4),  //非关键性问题。
    Information(8),  //信息性消息。

    Resume(0x800),//逻辑操作的恢复。
    Start(0x100),     //逻辑操作的开始。
    Stop(0x200),      //逻辑操作的停止。
    Suspend(0x400),   //逻辑操作的挂起。
    Transfer(0x1000), //相关标识的更改。
    Verbose(0x10);   //调试跟踪。

    private final int value;

    TraceEventType(int value) {
        this.value = value;
    }

    public int value() {
        return value;
    }
}
