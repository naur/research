package org.naure.common.location;

import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 6/16/12
 * Time: 10:24 PM
 * To change this template use File | Settings | File Templates.
 */
//表示市政地址。一个市政地址可以包括街道地址、邮政编码、省/直辖市/自治区和国家/地区等字段。
public class CivicAddress implements Serializable {
    public CivicAddress() {
    }

    public CivicAddress(String addressLine1,
                        String addressLine2,
                        String building,
                        String city,
                        String countryRegion,
                        String floorLevel,
                        String postalCode,
                        String stateProvince
    ) {
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountryRegion() {
        return countryRegion;
    }

    public void setCountryRegion(String countryRegion) {
        this.countryRegion = countryRegion;
    }

    public String getFloorLevel() {
        return floorLevel;
    }

    public void setFloorLevel(String floorLevel) {
        this.floorLevel = floorLevel;
    }

    public boolean isUnknown() {
        return isUnknown;
    }

    public void setUnknown(boolean unknown) {
        isUnknown = unknown;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    private String addressLine1; //获取或设置第一行地址。
    private String addressLine2;//获取或设置第二行地址。
    private String building;//获取或设置大楼名称或楼号。
    private String city;//获取或设置城市名称。
    private String countryRegion;//获取或设置位置所在的国家/地区。
    private String floorLevel;//获取或设置位置所在的楼层。
    private boolean isUnknown;//获取一个值，该值指示 CivicAddress 是否包含数据。
    private String postalCode;//获取或设置位置的邮政编码。
    private String stateProvince;//获取或设置位置所在的省/直辖市/自治区。
}
