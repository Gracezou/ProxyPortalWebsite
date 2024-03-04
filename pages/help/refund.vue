<template>
  <div class="policy_wrapper">
    <div class="policy_body">
      <h1>{{ $t('refund.refundPolicy') }}</h1>
      <p>{{ $t('refund.policyIntroduction') }}</p>
      <h3> {{ $t('refund.disputeResolution') }}</h3>
      <p>{{ $t('refund.disputeResolutionDesc') }}</p>
      <p>{{ $t('refund.issueResolution') }}</p>
      <p>{{ $t('refund.supportLogs') }}</p>
      <p>{{ $t('refund.nonRefundableSituations') }}</p>
      <p>{{ $t('refund.incompleteInformation') }}</p>
      <p>{{ $t('refund.accountViolation') }}</p>
      <p>{{ $t('refund.termsViolation') }}</p>
      <p>{{ $t('refund.dataTransmission') }}</p>
      <p>{{ $t('refund.serviceQuality') }}</p>
      <p>{{ $t('refund.serviceExpiration') }}</p>
      <p>{{ $t('refund.thirdPartyServices') }}</p>
      <p>{{ $t('refund.softwareIncompatibility') }}</p>
      <!-- 2-->
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
@import url('./policy.scss');
</style>
