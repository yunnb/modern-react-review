import React, {useContext} from "react";
import {UserDispatch} from "../App";

const User = React.memo(function User({user}) {
    const dispatch = useContext(UserDispatch);
    // useContext Hook 을 사용해 App 에서 createContext 로 선언한 UserDispatch Context(dispatch) 조회
    return (
        <div>
            <b
                style={{
                    cursor: "pointer",
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => {
                    dispatch({type: 'TOGGLE_USER', id: user.id})
                }}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={() => {
                dispatch({type: 'REMOVE_USER', id: user.id})
            }}>
                remove
            </button>
        </div>
    );
});

function UserList({users}) {
    return (
        <div>
            {users.map(user => (
                <User
                    user={user}
                    key={user.id}
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);
// React.memo: 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링 가능 -> 성능 최적화