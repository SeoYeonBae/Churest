package com.ssafy.churest.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class BirdHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int birdHouseId;

    @Column(length = 10)
    private String name;

    private String description;

    private int price;

    @Builder
    private BirdHouse(String name, String description, int price){
        this.name = name;
        this.description = description;
        this.price = price;
    }
}
