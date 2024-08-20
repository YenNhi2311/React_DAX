package com.edu.controller;

import com.edu.core.response.ResponseObject;
import com.edu.dto.PaymentDTO;
import com.edu.services.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentController {
  private final PaymentService paymentService;

  @Autowired
  HttpServletResponse response;

  @GetMapping("/vn-pay")
  public ResponseObject<PaymentDTO.VNPayResponse> pay(
    HttpServletRequest request,
    HttpServletResponse response
  ) {
    return new ResponseObject<>(
      HttpStatus.OK,
      "Success",
      paymentService.createVnPayPayment(request)
    );
  }

  @GetMapping("/return")
  public ResponseObject<PaymentDTO.VNPayResponse> payCallbackHandler(
    HttpServletRequest request
  ) {
    String status = request.getParameter("vnp_ResponseCode");

    if ("00".equals(status)) {
      return new ResponseObject<>(
        HttpStatus.OK,
        "Success",
        new PaymentDTO.VNPayResponse("00", "Success", "")
      );
    } else {
      return new ResponseObject<>(HttpStatus.BAD_REQUEST, "Failed", null);
    }
  }
}
