package com.example.demo.BaseEnum;

public enum  BaseEnum {
    CASH(1, "现金"),
    ALIPAY(2, "支付宝"),
    WECHAT(3, "微信"),
    BANK_CARD(4, "银行卡"),
    BONUS(5, "奖励金"),
    BUSINESS_BALANCE(6, "账户余额"),
    ALIPAY_SWEEP(7, "支付宝线下付款"),
    WECHAT_SWEEP(8, "微信线下付款"),
    MASGET(9, "荣邦支付"),
    ICBC(10, "工商银行");

    private Byte value;
    private String name;

    private BaseEnum(int value, String name) {
        this.value = (byte)value;
        this.name = name;
    }

    public Byte getValue() {
        return this.value;
    }

    public String getName() {
        return this.name;
    }
}
