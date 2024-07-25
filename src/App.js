import React, {useCallback, useMemo, useReducer, useRef, useState} from 'react';
import './App.css';
import CreateUser from "./test/CreateUser";
import UserList from "./test/UserList";
import useInputs from "./test/useInputs";

function countActiveUsers(users) {
    console.log('활성 사용자 수 세는 중...');
    return users.filter(user => user.active).length;
}

const initialState = {
    users: [  // 사용자 목록 관리
        {
            id: 1,
            username: 'yunnb',
            email: 'yunnb@naver.com',
            active: true
        },
        {
            id: 2,
            username: 'John Doe',
            email: 'john@naver.com',
            active: false
        },
        {
            id: 3,
            username: 'Steve',
            email: 'steve@naver.com',
            active: false
        }
    ],

};

function reducer(state, action) {  // action 에 따라 state 업데이트
    switch (action.type) {  // action. : dispatch 로 넘겨받은 필드
        case 'CREATE_USER':
            return {
                users: state.users.concat(action.user)
            };
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.id ? {...user, active: !user.active} : user
                )
            };
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            }
        default:
            return state;
    }
}

// UserDispatch 라는 이름으로 내보내기 -> useContext 로 사용
export const UserDispatch = React.createContext(null);

function App() {
    const [state, dispatch] = useReducer(reducer, initialState); // state: 현재 상태, dispatch: 액션 보내는 함수
    const {users} = state;  // 'state' 객체에서 'users' 필드를 추출하여 할당 (객체 구조 분해 할당)

    const count = useMemo(() => countActiveUsers(users), [users]);
    return (
        /*Context 로 dispatch 제공*/
        <UserDispatch.Provider value={dispatch}>
            <CreateUser/>
            <UserList users={users} />
            <div>활성 사용자 수: {count}</div>
        </UserDispatch.Provider>
    );
}

export default App;
