import React, {useCallback, useContext, useRef} from 'react';
import useInputs from "./useInputs";
import {UserDispatch} from "../App";

const CreateUser = () => {
    const dispatch = useContext(UserDispatch);
    const [{username, email}, onChange, reset] = useInputs({
        username: '',
        email: '',
    });
    const nextId = useRef(4);

    const onCreate = () => {
        dispatch({
            type: 'CREATE_USER',
            user: {
                id: nextId.current,
                username,
                email
            }
        })
        reset();
        nextId.current += 1;
    };

    return (
        <>
            <input
                name='username'
                placeholder="Username"
                onChange={onChange}
                value={username}
            />
            <input
                name='email'
                placeholder="Email"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>
                register
            </button>
        </>
    )
};

export default React.memo(CreateUser);
// React.memo: 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링 가능 -> 성능 최적화