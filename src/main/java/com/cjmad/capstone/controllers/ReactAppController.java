package com.cjmad.capstone.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactAppController {

    @RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!api|auth$).*$}/*/{y:[\\w\\-]+}","/error"  })
    public String index() {
        return "index.html";
    }
}
