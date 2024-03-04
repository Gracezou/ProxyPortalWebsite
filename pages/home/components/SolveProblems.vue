<template>
  <div class="solve_problem_wrapper">
    <h1 class="solve_problem_title">{{ $t('home.solveProblemTitle') }}</h1>
    <p class="solve_problem_desc">{{ $t('home.solveProblemDesc') }}</p>
    <el-collapse accordion v-model="activeName">
      <el-collapse-item v-for="item in problemList" :key="item.name" :name="item.name">
        <template #title>
          <div class="problem_question">
            <el-icon size="16" v-if="activeName === item.name">
              <Minus />
            </el-icon>
            <el-icon size="16" v-else>
              <Plus />
            </el-icon>
            <p>{{ $t(item.question) }}</p>
          </div>
        </template>
        <p class="problem_answer">{{ $t(item.answer) }}</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
  
<script setup lang='ts'>
import { Minus, Plus } from '@element-plus/icons-vue';
const activeName = ref()
const problemList = [
  { name: 'Q1', question: 'home.solveProblemQ1', answer: 'home.solveProblemA1' },
  { name: 'Q2', question: 'home.solveProblemQ2', answer: 'home.solveProblemA2' },
  { name: 'Q3', question: 'home.solveProblemQ3', answer: 'home.solveProblemA3' },
  { name: 'Q4', question: 'home.solveProblemQ4', answer: 'home.solveProblemA4' },
  { name: 'Q5', question: 'home.solveProblemQ5', answer: 'home.solveProblemA5' },
  { name: 'Q6', question: 'home.solveProblemQ6', answer: 'home.solveProblemA6' },
  { name: 'Q7', question: 'home.solveProblemQ7', answer: 'home.solveProblemA7' },
]

</script>
  
<style lang="scss" scoped>
.solve_problem_wrapper {
  width: 1400px;
  margin: 0 auto;
  margin-bottom: 104px;
  padding: 0 40px;
  box-sizing: border-box;

  .el-collapse-item {
    --el-collapse-header-height: 70px;
  }
}

.solve_problem_title {
  line-height: 55px;
  font-size: 36px;
  color: #333333;
  font-weight: normal;
  margin: 0;
}

.solve_problem_desc {
  line-height: 25px;
  font-size: 16px;
  color: #374459;
  margin-top: 0;
  margin-bottom: 30px;
}

.problem_question {
  font-size: 18px;
  color: #081D4D;
  display: flex;
  align-items: center;
  padding-left: 30px;

  .el-icon {
    margin-right: 10px;
  }
}

.problem_answer {
  padding: 0 85px;
  font-size: 15px;
  font-weight: 300;
  color: #374459;
}
</style>
<style lang="scss">
.el-collapse-item .el-collapse-item__arrow {
  display: none;
}
</style>
