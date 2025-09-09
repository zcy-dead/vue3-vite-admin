<script setup lang="ts">

</script>

<template>
  <div class="app-cntainer">
    <div class="title">
      此页面仅用户身份包含: [reviewer] 可见
    </div>
    <div class="content">
      <div class="ghost">
        <div class="body">
          <div class="face">
            <div class="eye left" />
            <div class="eye right" right />

            <div class="mouth" />
          </div>
          <div class="limbs">
            <div class="arm left" />
            <div class="arm right" />
            <div class="nofoot">
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
        <div class="shadow" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-cntainer {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 30px;
}
.content {
  width: 400px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ghost {
  width: 160px;
  height: 200px;
}
.body {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 80px 80px 0 0;
  background-color: #9999ff;
  animation: body 4s ease infinite;
}
@keyframes body {
  0%,
  100% {
    top: 0px;
  }
  40% {
    top: -40px;
  }
}
.face {
  width: 80px;
  height: 40px;
  display: flex;
  position: absolute;
  top: 65px;
  left: 40px;
  background-color: #9999ff;
  .eye {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
  }
  .eye.left {
    position: absolute;
    left: 0;
  }
  .eye.right {
    position: absolute;
    right: 0;
  }
  .mouth {
    width: 30px;
    height: 15px;
    background-color: black;
    border-radius: 0 0 50% 50%;
    position: absolute;
    bottom: 0px;
    left: 25px;
  }
}

.limbs {
  .arm {
    width: 60px;
    height: 40px;
    background-color: #9999ff;
  }
  .arm.left {
    position: absolute;
    top: 136px;
    left: -4px;
    border-radius: 60% 100%;
    animation: arm-left 4s ease infinite;
  }
  @keyframes arm-left {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(50deg);
    }
    40% {
      transform: translate(-50%, -50%) rotate(40deg);
    }
  }

  .arm.right {
    position: absolute;
    top: 136px;
    right: -65px;
    border-radius: 100% 60%;
    animation: arm-right 4s ease infinite;
  }
  @keyframes arm-right {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(-50deg);
    }
    40% {
      transform: translate(-50%, -50%) rotate(-40deg);
    }
  }

  .nofoot {
    height: 30px;
    width: 160px;
    background-color: transparent;
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: -1px;

    div {
      flex-grow: 1;
      position: relative;
      top: -15px;
      border-radius: 50%;
      background-color: #9999ff;
    }

    div:nth-child(2n) {
      position: relative;
      top: -8px;
      margin: 0 -2px;
      background-color: transparent;
      border-top: 10px solid #9999ff;
    }
  }
}

.shadow {
  width: 200px;
  height: 12px;
  border-radius: 50%;
  background-color: gray;
  position: relative;
  top: 150px;
  right: 20px;
  animation: shadow 4s ease infinite;
}
@keyframes shadow {
  0%,
  100% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.5);
  }
}
</style>
