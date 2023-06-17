package com.rn_boilerplate_ts;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Debug;
import android.os.ParcelFileDescriptor;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.util.Log;
import android.util.Size;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContract;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityOptionsCompat;
import androidx.documentfile.provider.DocumentFile;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class PermissionModule extends ReactContextBaseJavaModule {
    PermissionModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(mActivityEventListener);
    }

    @NonNull
    @Override
    public String getName() {
        return "PermissionModule";
    }
    private Promise mPromise;
    private ActivityResultLauncher<Intent> launcher; // Initialise this object in Activity.onCreate()
    private Uri baseDocumentTreeUri;

    public void launchBaseDirectoryPicker() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        getCurrentActivity().startActivityForResult(intent, Constant.REQUEST_CODE_PERMISSION);
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode != Constant.REQUEST_CODE_PERMISSION) {
                return;
            }
            if (resultCode == Activity.RESULT_OK) {
                baseDocumentTreeUri = Objects.requireNonNull(intent.getData());
                final int takeFlags = (Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);

                // take persistable Uri Permission for future use
                Uri uri = intent.getData();
                Objects.requireNonNull(getCurrentActivity()).getContentResolver().takePersistableUriPermission(uri, takeFlags);

                DocumentFile directory = DocumentFile.fromTreeUri(getCurrentActivity(), baseDocumentTreeUri);
                DocumentFile file = directory.createDirectory("CompressVideos");
                Log.d("FileUtility", file.getUri().toString());
                mPromise.resolve(file.getUri().toString());

            } else {
                Log.e("FileUtility", "Some Error Occurred : " );
            }
        }

    };

    @ReactMethod
    public void requestWritePermission(Promise promise) {
        mPromise = promise;
        launchBaseDirectoryPicker();
    }

    @ReactMethod
    public void createVideo(String fileName, Promise promise)  {
    }
}