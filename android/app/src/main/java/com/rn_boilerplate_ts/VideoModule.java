package com.rn_boilerplate_ts;

import static android.provider.MediaStore.Video.Thumbnails.MINI_KIND;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Callback;
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
import java.lang.reflect.Array;
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
import android.media.MediaMetadataRetriever;
import android.media.MediaScannerConnection;
import android.media.ThumbnailUtils;
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
        public String createdAt;
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

    public void refreshVideos(Callback callback) {
        Log.d("VIDEOS: SCAN FILE", "");
        MediaScannerConnection.scanFile(
                getCurrentActivity(),
                new String[]{MediaStore.Video.Media.EXTERNAL_CONTENT_URI.toString()},
                null,
                new MediaScannerConnection.OnScanCompletedListener() {
                    @Override
                    public void onScanCompleted(String path, Uri uri) {
                        callback.invoke();
                    }
                }
        );
    }

    public void queryVideos(@Nullable  String path, Callback callback) {
        Log.d("VIDEOS: PATH", path != null ? path : "NULL");
        List<Video> videoList = new ArrayList<Video>();
        try {
            Uri collection = path != null ? Uri.parse(path) : MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            String sortOrder = MediaStore.Video.Media.DATE_ADDED + " DESC";
            Cursor cursor = getCurrentActivity().getContentResolver().query(
                    collection,
                    null,
                    null,
                    null,
                    sortOrder
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
            int createAtColumn = cursor.getColumnIndex(MediaStore.Video.Media.DATE_ADDED);
            // Cache column indices.
            while (cursor.moveToNext()) {
                Video video = new Video();
                video.size = cursor.getInt(sizeColumn);
                if (video.size == 0) {
                   // continue;
                }
                video.id = cursor.getLong(idColumn);
                video.title = cursor.getString(titleColumn);
                video.displayName = cursor.getString(displayNameColumn);
                video.data = cursor.getString(dataColumn);
                video.duration = cursor.getInt(durationColumn);
                video.relativePath = cursor.getString(relativePathColumn);
                video.bitrate = cursor.getInt(bitrateColumn);
                video.width = cursor.getInt(widthColumn);
                video.height = cursor.getInt(heightColumn);
                video.resolution = cursor.getString(resolutionColumn);
                video.orientation = cursor.getString(orientationColumn);
                video.createdAt = cursor.getString(createAtColumn);
                Uri uri = ContentUris.withAppendedId(
                        MediaStore.Video.Media.EXTERNAL_CONTENT_URI, video.id);
                video.uri = uri.toString();
                try {
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
                        Bitmap bitmapThumb =
                                getCurrentActivity().getApplicationContext().getContentResolver().loadThumbnail(
                                        uri, new Size(320, 180), null);
                        video.base64Thumb = "data:image/jpeg;base64," + Util.bitmapToBase64(bitmapThumb);
                    }
                }
                catch (Exception ex2) {

                }
                Log.d("VIDEO:", video.title);
                videoList.add(video);
            }
        } catch (Exception e) {
            Log.d("VIDEO: ERROR", e.toString());
            e.printStackTrace();
        }

        callback.invoke(convertResult(videoList));
    }


    @ReactMethod
    public void getVideos( @Nullable String path, Promise promise) {
        refreshVideos(new Callback() {
            @Override
            public void invoke(Object... objects) {
                queryVideos(path, new Callback() {
                    @Override
                    public void invoke(Object... objects) {
                        promise.resolve(objects[0]);
                    }
                });
            }
        });
    }

    @ReactMethod
    public void getVideoInfo( @Nullable String path, Promise promise) {
        Uri videoUri =Uri.parse(path); // The URI of the video

        MediaMetadataRetriever retriever = new MediaMetadataRetriever();

        try {
            retriever.setDataSource(getCurrentActivity(), videoUri);
            Video video = new Video();
            video.title = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE);
            video.displayName = video.title;
            video.data  = null ;
            video.duration = Integer.parseInt(retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION));
            video.size = 0 ;
            video.bitrate = Integer.parseInt(retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_BITRATE));
            video.width = Integer.parseInt(retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH));
            video.height = Integer.parseInt(retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT));
            video.orientation = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_ROTATION);
            video.createdAt = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DATE);

            promise.resolve(Util.convertObjectToMap(video));
            retriever.release();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

        }
    }

    @ReactMethod
    public void createThumbnail(String path, Promise promise) {
        Log.d("VIDEOS: create thumbnail ", path);
        try {
            Bitmap thumbnail = ThumbnailUtils.createVideoThumbnail(path, MINI_KIND);
            promise.resolve(Util.bitmapToBase64(thumbnail));
        }
        catch (Exception error) {
            promise.reject("ERROR");
        }

    }
}
