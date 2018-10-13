package com.example.sameeryarlagadda.lab2;

import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.ml.vision.FirebaseVision;
import com.google.firebase.ml.vision.barcode.FirebaseVisionBarcode;
import com.google.firebase.ml.vision.barcode.FirebaseVisionBarcodeDetectorOptions;
import com.google.firebase.ml.vision.cloud.FirebaseVisionCloudDetectorOptions;
import com.google.firebase.ml.vision.cloud.label.FirebaseVisionCloudLabelDetector;
import com.google.firebase.ml.vision.common.FirebaseVisionImage;
import com.google.firebase.ml.vision.document.FirebaseVisionDocumentText;
import com.google.firebase.ml.vision.document.FirebaseVisionDocumentTextRecognizer;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MainActivity extends AppCompatActivity{
    FirebaseAuth mauth;
    Button logout,picture,mCloudButton;
    ImageView mImageView,imageview1;
    int camera_request=0;
    Bitmap mSelectedImage;
    TextView textView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mauth = FirebaseAuth.getInstance();

        if (mauth.getCurrentUser()==null){
            startActivity(new Intent(MainActivity.this,loginActivity.class));
            finish();
        }
        setContentView(R.layout.activity_main);

        logout = (Button) findViewById(R.id.button5);
        mImageView =(ImageView) findViewById(R.id.imageView);
        picture = (Button) findViewById(R.id.button3);
        mCloudButton = findViewById(R.id.button4);
        imageview1 = (ImageView) findViewById(R.id.imageView);
        //textView = (TextView) findViewById(R.id.textView);

        mCloudButton.setEnabled(false);
        mCloudButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                runCloudTextRecognition();
            }
        });

        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mauth.signOut();
                startActivity(new Intent(MainActivity.this,loginActivity.class));
                finish();

            }
        });

        picture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
                startActivityForResult(intent,camera_request);
            }
        });

    }
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == camera_request) {
            mSelectedImage = (Bitmap) data.getExtras().get("data");
            //sets imageview as the bitmap
            imageview1.setImageBitmap(mSelectedImage);
            mCloudButton.setEnabled(true);
        }
    }
    private void runCloudTextRecognition() {
        mCloudButton.setEnabled(false);
        if(mSelectedImage==null){
            showToast("no image");

        }
        FirebaseVisionImage image = FirebaseVisionImage.fromBitmap(mSelectedImage);
        FirebaseVisionDocumentTextRecognizer detector = FirebaseVision.getInstance()
                .getCloudDocumentTextRecognizer();
        detector.processImage(image)
                .addOnSuccessListener(
                        new OnSuccessListener<FirebaseVisionDocumentText>() {
                            @Override
                            public void onSuccess(FirebaseVisionDocumentText texts) {
                                mCloudButton.setEnabled(true);
                                processCloudTextRecognitionResult(texts);
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                // Task failed with an exception
                                mCloudButton.setEnabled(true);
                                e.printStackTrace();
                            }
                        });
    }

    private void processCloudTextRecognitionResult(FirebaseVisionDocumentText text) {
        // Task completed successfully
        if (text == null) {
            showToast("No text found");
            return;
        }
        List<FirebaseVisionDocumentText.Block> blocks = text.getBlocks();
        String s = " ";
        for (int i = 0; i < blocks.size(); i++) {
            List<FirebaseVisionDocumentText.Paragraph> paragraphs = blocks.get(i).getParagraphs();
            for (int j = 0; j < paragraphs.size(); j++) {
                List<FirebaseVisionDocumentText.Word> words = paragraphs.get(j).getWords();
                for (int l = 0; l < words.size(); l++) {

                    s = s + words.get(l).getText()+" ";

                }
            }
        }
        showToast(""+s);
        //textView.setText(s);

    }

    private void showToast(String message) {
        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }





}
