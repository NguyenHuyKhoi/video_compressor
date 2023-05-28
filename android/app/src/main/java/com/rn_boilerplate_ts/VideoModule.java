package com.rn_boilerplate_ts;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.google.gson.Gson;

import java.io.File;
import java.io.IOException;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import android.annotation.SuppressLint;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Debug;
import android.os.Environment;
import android.provider.ContactsContract;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.util.Size;

public class VideoModule extends ReactContextBaseJavaModule {
    VideoModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "VideoModule";
    }

    // Need the READ_EXTERNAL_STORAGE permission if accessing video files that your
// app didn't create.

    // Container for information about each video.
    class Video {
        public Long id;
        public String title;
        public String displayName;
        public String data;
        public int duration;
        public int size;
        public String relativePath;
        public int bitrate;
        public int width;
        public int height;
        public String resolution;
        public String uri;
        public String base64Thumb;

        public String orientation;

    }

    public WritableArray convertResult(List<Video> result) {
        WritableArray array = new WritableNativeArray();
        for (Video item : result) {
            WritableMap wm = Util.convertObjectToMap(item);
            if (wm != null) {
                array.pushMap(wm);
            }
        }
        return array;
    }
    @ReactMethod
    public void getVideos(@Nullable String path,  Promise promise) {
        List<Video> videoList = new ArrayList<Video>();
        String[] projection = new String[] {
                MediaStore.Video.Media._ID,
                MediaStore.Video.Media.TITLE,
                MediaStore.Video.Media.DISPLAY_NAME,
                MediaStore.Video.Media.DATA,
                MediaStore.Video.Media.DURATION,
                MediaStore.Video.Media.SIZE,
                MediaStore.Video.Media.RELATIVE_PATH,
                MediaStore.Video.Media.BITRATE,
                MediaStore.Video.Media.WIDTH,
                MediaStore.Video.Media.HEIGHT,
                MediaStore.Video.Media.RESOLUTION,
                MediaStore.Video.Media.ORIENTATION,

        };
        try {
            Uri collection;
            if (path == null) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    collection = MediaStore.Video.Media.getContentUri(MediaStore.VOLUME_EXTERNAL);
                } else {
                    collection = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                }
            }
            else {
                collection = Uri.parse(path);
            }

            Log.d("VIDEO:", collection.toString()+ "---- " + path);
            Cursor cursor = getCurrentActivity().getContentResolver().query(
                    collection,
                    projection,
                    null,
                    null,
                    null
            );
            int idColumn = cursor.getColumnIndex(MediaStore.Video.Media._ID);
            int titleColumn = cursor.getColumnIndex(MediaStore.Video.Media.TITLE);
            int displayNameColumn = cursor.getColumnIndex(MediaStore.Video.Media.DISPLAY_NAME);
            int dataColumn = cursor.getColumnIndex(MediaStore.Video.Media.DATA);
            int durationColumn = cursor.getColumnIndex(MediaStore.Video.Media.DURATION);
            int sizeColumn = cursor.getColumnIndex(MediaStore.Video.Media.SIZE);
            int relativePathColumn = cursor.getColumnIndex(MediaStore.Video.Media.RELATIVE_PATH);
            int bitrateColumn = cursor.getColumnIndex(MediaStore.Video.Media.BITRATE);
            int widthColumn = cursor.getColumnIndex(MediaStore.Video.Media.WIDTH);
            int heightColumn = cursor.getColumnIndex(MediaStore.Video.Media.HEIGHT);
            int resolutionColumn = cursor.getColumnIndex(MediaStore.Video.Media.RESOLUTION);
            int orientationColumn = cursor.getColumnIndex(MediaStore.Video.Media.ORIENTATION);
            // Cache column indices.
            while (cursor.moveToNext()){
                Video video = new Video();
                video.id = cursor.getLong(idColumn);
                video.title = cursor.getString(titleColumn);
                video.displayName = cursor.getString(displayNameColumn);
                video.data = cursor.getString( dataColumn);
                video.duration = cursor.getInt( durationColumn);
                video.size = cursor.getInt(sizeColumn);
                video.relativePath = cursor.getString(relativePathColumn);
                video.bitrate = cursor.getInt(bitrateColumn);
                video.width = cursor.getInt(widthColumn);
                video.height = cursor.getInt(heightColumn);
                video.resolution = cursor.getString(resolutionColumn);
                video.orientation = cursor.getString(orientationColumn);

                Uri uri =  ContentUris.withAppendedId(
                        MediaStore.Video.Media.EXTERNAL_CONTENT_URI, video.id);
                video.uri =uri.toString();
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
                    Bitmap bitmapThumb =
                            getCurrentActivity().getApplicationContext().getContentResolver().loadThumbnail(
                                    uri, new Size(120, 120), null);
                    video.base64Thumb = Util.bitmapToBase64(bitmapThumb);
                }
                Log.d("VIDEO:", video.title);
                videoList.add(video);
            }
        }
        catch (Exception e) {
            Log.d("VIDEO: ERROR", e.toString());
            e.printStackTrace();
        }

        WritableArray result = convertResult(videoList);
        promise.resolve(result);

    }
}