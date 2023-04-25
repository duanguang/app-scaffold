package com.hoolinkspdanative;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;
import android.content.IntentFilter;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
public class PdaScanModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    // pad广播动作名称
    private static String SCAN_ACTION_NAME = "com.android.decodewedge.decode_action";
    // pad扫码结果输出字段名称
    private static String SCAN_ACTION_CODE = "com.android.decode.intentwedge.barcode_string";

    @Override
    public String getName() {
        return "PdaScan";
    }

    public PdaScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        IntentFilter IntentFilter = new IntentFilter();
        IntentFilter.addAction(SCAN_ACTION_NAME);
        IntentFilter.setPriority(Integer.MAX_VALUE);
        // 注册广播
        reactContext.registerReceiver(scanReceiver, IntentFilter);
    }

    // 创建一个广播接收器
    private BroadcastReceiver scanReceiver = new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
          try {
            WritableMap params = Arguments.createMap();
            String actionName = intent.getAction();
            if (SCAN_ACTION_NAME.equals(actionName)) {
                params.putString("code", intent.getStringExtra(SCAN_ACTION_CODE));
            } else {
              Log.i("PdaScannerPlugin", "NoSuchAction");
            }
            sendEvent(getReactApplicationContext(), "onEvent", params);
          } catch (Exception e) {
            WritableMap errorParams = Arguments.createMap();
            errorParams.putString("message", e.getMessage());
            sendEvent(getReactApplicationContext(), "onError", errorParams);
          }
      }
    };

    // 主动往javascript发送事件
    private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
      getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,
          params);
    }

    // 动态设置设备广播参数
    @ReactMethod
    public void setScan(String actionName, String actionCode) {
        SCAN_ACTION_NAME = actionName;
        SCAN_ACTION_CODE = actionCode;
    }

    @ReactMethod
    public void addListener(String eventName) {
        Log.i("PdaScannerPlugin", "addListener");
    // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        Log.i("PdaScannerPlugin", "removeListeners");
    // Keep: Required for RN built in Event Emitter Calls.
    }

}
