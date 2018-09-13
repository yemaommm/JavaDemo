package com.example.demo.DeSerializable;

import com.example.demo.BaseEnum.BaseEnum;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

public class EnumDeSrializable<T extends Enum> {

    private Class<?> clazz;

    public EnumDeSrializable(Class<T> clazz){
        this.clazz = clazz;
        T[] enumConstants = clazz.getEnumConstants();
        for (T e : enumConstants) {
            System.out.println(e);
        }
    }

    public static void main(String []arg){
        new EnumDeSrializable(BaseEnum.class);
    }

    class DeSrializable extends JsonDeserializer<BaseEnum> {

        @Override
        public BaseEnum deserialize(JsonParser parser, DeserializationContext ctxt) throws IOException, JsonProcessingException {
            String value = null;
            if (parser.isExpectedStartObjectToken()) {
                JsonNode node = parser.readValueAsTree();
                value = node.get("id").asText();
            } else {
                value = parser.readValueAs(String.class);
            }
//            if (StringUtils.isBlank(value)) {
//                return null;
//            }
            for (BaseEnum paymentMethod : BaseEnum.values()) {
                if (paymentMethod.getValue().equals(Byte.valueOf(value))) {
                    return paymentMethod;
                }
            }
            return null;
        }
    }
}
