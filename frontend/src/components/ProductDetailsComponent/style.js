import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall=styled(Image)`
height:85px;
width:85px;

`
export const WrapperStyleColImage=styled(Col)`
flex-basis:unset;
display:flex;
`
export const WrapperStyleNameProduct =styled.h1`
color: rgb(36,36,36);
font-size:24px;
font-weight:300;
line-height:32px;
word-break:break-word;
`
export const WrapperPriceProduct = styled.div`
background:rgb(250,250,250);
border-radius:4px;
`
export const WrapperPriceTextProduct = styled.h1`
font-size:32px;
line-height:40px;
margin-right:8px;
font-weight:500;
padding:10px;
margin-top:10px;
`
export const WrapperAddressProduct = styled.div`
span.address{
    text-decoration: underline;
    font-size:15px;
    line-height:24px;    
    font-weight:500;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:hidden;
    
};
span.change-address{
    color:rgb(11,116,229);
    font-size:16px;
    line-height:24px;
    font-weight:500;
   
}
`
export const WrapperQualityProduct = styled.h1`
display:flex;
gap:4px;
align-items:center;
border:1px solid #ccc;
width:120px;
border-radius:4px;
`


export const WrapperInputNumber=styled(InputNumber)`
&.ant-input-number.ant-input-number-sm{
width:60px;
border-top:none;
border-bottom:none;
&.ant-input-number-handler-wrap {
display:none;
}
}

`
