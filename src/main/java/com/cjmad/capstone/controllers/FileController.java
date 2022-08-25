package com.cjmad.capstone.controllers;


import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

import java.net.URL;
import java.util.Map;


public class FileController {
/*
    private static final String MEDIA_TYPE_IMAGE = "image/*";
    private static final String MESSSAGE_UPLOAD_SUCCESS = "Upload Success";
    private static final String MESSSAGE_UPLOAD_FAIL = "Upload Fail";
    private static final String FILE_NAME = "fileName";


    @Autowired
    FileService fileService;

    @GetMapping
    public ResponseEntity<Object> findByName(@RequestBody(required = false) Map<String, String> params) {
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noCache())
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + params.get(FILE_NAME) + "\"")
                .body(new InputStreamResource(fileService.findByName(params.get(FILE_NAME))));

    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestParam("file") MultipartFile file) {
        if (fileService.save(file)) {
            return ResponseEntity.ok(MESSSAGE_UPLOAD_SUCCESS);
        } else {
            return ResponseEntity.badRequest().body(MESSSAGE_UPLOAD_FAIL);
        }
    }

    @PostMapping
    public ResponseEntity<Object> upload(@RequestBody Map<String, String> params) {
        if (fileService.upload(params.get(FILE_NAME), params.get("file"))) {
            return ResponseEntity.ok(MESSSAGE_UPLOAD_SUCCESS);
        } else {
            return ResponseEntity.badRequest().body(MESSSAGE_UPLOAD_FAIL);
        }
    }


    System.out.println("Generating pre-signed URL.");
    GeneratePresignedUrlRequest generatePresignedUrlRequest =
            new GeneratePresignedUrlRequest(bucketName, objectKey)
                    .withMethod(HttpMethod.GET)
                    .withExpiration(expiration);
    URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);

 */
}
