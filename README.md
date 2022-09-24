// 문제점& 개선할점.

1. 세팅 누를때마다 모든 row가 리렌더링된다. 왜?

내가볼때는. onRowMoveBtn이 계속 다시 만들어지고 있어서
useCallback쓰면 될듯 하다. --> ok 해결됨.

왜 계속 만들어지는가?

컴포넌트가 렌더링 되는 이유

1. state가 바뀔때
2. props가 바뀔때.
3. 부모 컴포넌트가 렌더링될때.
4. 강제 리렌더링.

근데 app의 경우 itemArray가 바뀌는데도
re-rendering되지는 않네?
--> ㄴㄴ 얘도 된다. 근데 필요한가? 왜 되지?

5. DeleteRow에서 두개까지는 잘 지워지는데
   그 다음부터 에러가 생김.
   아무래도 overlay들어갈때,
   !를 쓴게 문제였다.

그리고 스타일 측면에서

item이 삭제되면 row가 줄어든다.
그게 아니라 그냥 고정된 걸 쓰고싶다
min-height가 아니라 그냥 height를 쓰자.

그리고 row 추가되었을때
body의 height랑. 또 grid-auto-height도 추가할 필요가 있다.

3. refactoring도 누더기다..

<!-- 일단 settingOverlay 분리하고 -->

또 draggable도 분리하고.

변수 이름도 좀 더 정확하게 할 필요가 있다.
currentSettingRowId로 하던지
아니면 그냥 obj로 하던지.

currentSettingRowId! 이것도
어떻게 고칠 방법이 없을까.

action에 불필요한것은 없는가/

3. Taction을 지금 계속 추가하고 있는디.. 이거밖에
   방법이 없는건가?
4. move function과 관련해서. 이거 그냥
   result를 넘겨주는거하고
   action에서도 그냥 payload하나만 넘겨주면 안되나?
   그럼 payload도 따로 타입을 정의해야하는거낙/?

5. 가장 큰 문제는......지금 \
   이름을 바꾸면..이게 맛이 가버릴수도 있다는것.
   왜냐하면 렌더링의 기준을 Rankenum으로 잡았는데
   rankBar의 이름을 자유롭게 바꾸어버리면

렌더링이나 이동부분에서 맛이 갈 수도 있다.

5.1. 세팅의 버튼 관련 기능들 구현하기.

6. rank부분 drag and drop 적용하기

<!-- 2-1. 리덕스 적용해보기. -->

<!-- 일단 싱글라인부터. 그리고 disaptch는 컨테이너 없이 그냥 적용해보기. -->

<!-- - typescript redux documentation 읽어보기. -->
<!-- - 구체적으로 container라던지. 그 값을 제공해주는게 아니라 짬밥해서 쓰는중. -->
  <!-- 지금 reducer action type 부분에서 에러가 나서 그냥 reducer를 any라고 해두긴 했음. -->
  <!-- 이건 combineReducers를 통해서 해결함. -->
  <!-- - createSlice로도 한번 해보기.  -->

3. 이미지 만들어서 사용하는것

4. 서버를 활용해서 이미지 업로드/ 이미지 삭제기능.
