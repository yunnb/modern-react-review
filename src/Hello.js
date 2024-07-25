import React from "react";

function Hello(props) {
    return <div style={{color: props.color}}>Hello {props.name}</div>;

}

Hello.defaultProps = {  // 기본값 설정
    name: 'no-name',
}
export default Hello;