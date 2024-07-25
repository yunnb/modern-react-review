import {useCallback, useReducer} from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                [action.name]: action.value,
            };
        case 'RESET':
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = '';
                return acc;
            }, {});

            // Object.keys(state) = 'state' 객체의 모든 키를 배열로 반환 -> ["username", "email"]
            // 'state' 는 폼의 현재 상태 = useInputs() 에서 form
            // .reduce: 배열의 각 요소를 순회하며, 누적값 ('acc') 생성. 초기 누적값은 빈 객체 '{}'
            // 'acc' 는 누적값을 저장하는 객체이며, 각 필드를 빈 문자열로 초기화하는 과정에서 사용됨
            // 'current' 는 현재 순회 중인 키(필드 이름)
        default:
            return state;
    }
}


function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);
    // form 에는 username:'', email: '' 저장

    // change
    const onChange = useCallback(e => {
        const {name, value} = e.target
        dispatch({type: 'CHANGE', name, value});
    }, []);

    const reset = useCallback(() => dispatch({type: 'RESET'}), []);
    return [form, onChange, reset];
}

export default useInputs;