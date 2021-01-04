<template>
  <el-dropdown
    trigger="click"
    class="international"
    v-bind="$attrs"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon name="language" class="international-icon" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
export default {
  name: 'LangSelect',
  setup() {
    const handleSetLanguage = (lang: string) => {
      // this.$i18n.locale = lang
      // AppModule.SetLanguage(lang)
      // const res: any = this.$t('common.switchLangSuccess')
      // this.$message.success(res)
    }
    return {
      language: '',
      handleSetLanguage
    }
  }
}
</script>
