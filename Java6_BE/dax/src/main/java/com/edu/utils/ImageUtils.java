package com.edu.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageUtils {

    // Đường dẫn đến thư mục lưu trữ hình ảnh
    private static final String UPLOAD_DIR = "src/main/resources/static/img/";

    static {
        // Tạo thư mục nếu nó không tồn tại
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
    }

    /**
     * Lưu hình ảnh vào thư mục
     * @param file Hình ảnh để lưu trữ
     * @return Đường dẫn của hình ảnh đã lưu
     * @throws IOException Nếu có lỗi trong khi lưu hình ảnh
     */
    public static String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Cannot store empty file.");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new IOException("Cannot get original filename.");
        }

        Path path = Paths.get(UPLOAD_DIR + originalFilename);
        Files.write(path, file.getBytes());

        return path.toString(); // Hoặc trả về đường dẫn tương đối nếu bạn muốn
    }

    /**
     * Xóa hình ảnh khỏi thư mục
     * @param imagePath Đường dẫn của hình ảnh để xóa
     * @throws IOException Nếu có lỗi trong khi xóa hình ảnh
     */
    public static void deleteImage(String imagePath) throws IOException {
        Path path = Paths.get(imagePath);
        if (Files.exists(path)) {
            Files.delete(path);
        } else {
            throw new IOException("File not found: " + imagePath);
        }
    }
}

