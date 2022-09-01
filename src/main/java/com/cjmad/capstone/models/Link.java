package com.cjmad.capstone.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class Link {
    private long userDogId;
    private long dogToLinkId;
    private Date date;
}
