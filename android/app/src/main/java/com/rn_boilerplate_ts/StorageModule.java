package com.rn_boilerplate_ts;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.ContentUris;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Log;
import android.util.Size;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.documentfile.provider.DocumentFile;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class StorageModule extends ReactContextBaseJavaModule {
    StorageModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(mActivityEventListener);
    }
    @NonNull
    @Override
    public String getName() {
        return "StorageModule";
    }

    private Promise mPromise;
    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode != Constant.REQUEST_CODE_DELETE_FILE) {
                return;
            }
            if (resultCode == Activity.RESULT_OK) {
                mPromise.resolve(true);
            } else {
                Log.e("FileUtility", "Some Error Occurred : " );
                mPromise.reject("ERROR");
            }
        }

    };

    @ReactMethod
    public void deleteFile(String path, Promise promise) {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            PendingIntent pendingIntent = MediaStore.createDeleteRequest(getCurrentActivity().getContentResolver(), Arrays.asList(Uri.parse(path)));
            try {
                mPromise = promise;
                getCurrentActivity().startIntentSenderForResult(pendingIntent.getIntentSender(), Constant.REQUEST_CODE_DELETE_FILE, null, 0, 0, 0 );
            }
            catch (Exception ex) {
                // TODO
                promise.reject("ERROR");
            }


        }
        else {
            // TODO
            promise.reject("SDK IS OLD, NOT SUPPORTED DELETE");
        }


    }
}