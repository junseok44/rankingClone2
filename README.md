<!-- 1. 일단 한 라인에서 이동하는것 -->

<!-- 2. 크로스 라인 이동하는것

-->

<!-- 지금 문제는 아이템이 없는 라인으로 이동이 안됨.
-->
<!-- 왜냐하면 아이템이 없으니까 height가 0이 되거든. -->

<!-- 또 아이템 라인에서 다른 라인으로 이동이 안됨.
이거는 dragdropContext를 동일한 것으로 바꿔놓음으로써 해결.  -->

// 문제점& 개선할점.

1. 세팅 누를때마다 모든 row가 리렌더링된다. 왜?

2. setting 관련해서. 너무 누더기다. 뭐가 뭔지 정리할 필요

- 일단 세팅에 들어간다. 그러면
  currentSettingRow가 그 droppableId (Rankenum)으로 세팅

currentSettingRow를 rank가 아닌 id로 설정해서

앞으로 조회할때는 id를 사용해서 조회할 수 있도록.

droppableId도 id로 바꾸자. 그러면 무슨 일이 일어나는가? 이동은 제대로 되는가?

- colorbox에서는 그 currentSettingRow의 bgColor를 조회해서. 걔랑 맞는 컬러박스에는 동그라미

- changeRowColor에서는 바꿀 색깔하고.
  currentSettingRow(Rankenum)을 전해준다.

- 그러면 obj 중에서 rank가 currentSettingRow와 같은것을 찾아서 bgColor를 color로 변경해준다.

--> 문제는 지금. rank의 이름이 droppableId로 되어있다.

그 row의 droppableId를 rank로 놔두고.
이름만 바꾸도록 해도 괜찮은건가?

DeleteRow의 경우

ClearRowImages의 경우
--> 그냥 그 row 찾아서 item다 지워주면 되고.
Add a Row의 경우.

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
