<template>
  <div class="policy_wrapper">
    <div class="policy_body">
      <h1>{{ $t('shipping.shippingTerms') }}</h1>
      <p>{{ $t('shipping.welcomeMessage') }}</p>
      <!-- 1-->
      <h3> {{ $t('shipping.deliveryInformation') }}</h3>
      <p>{{ $t('shipping.deliveryInformationDesc') }}</p>
      <p>{{ $t('shipping.slightDelays') }}</p>
      <!-- 2-->
      <h3> {{ $t('shipping.serviceCommitment') }}</h3>
      <p>{{ $t('shipping.activation') }}</p>
      <p>{{ $t('shipping.dataPrivacy') }}</p>
      <p>{{ $t('shipping.replacementService') }}</p>
      <p>{{ $t('shipping.encounteringIssues') }}</p>
      <!-- 3-->
      <h3> {{ $t('shipping.replacementPolicy') }}</h3>
      <p>{{ $t('shipping.replacementsProvided') }}</p>
      <p>{{ $t('shipping.replacementsApply') }}</p>
      <p>{{ $t('shipping.postLoginActivities') }}</p>
      <p>{{ $t('shipping.noRefundsOrReplacements') }}</p>
      <p class="compact">{{ $t('shipping.effectiveDate') }}</p>
      <p>{{ $t('shipping.company') }}</p>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
@import url('./policy.scss');
</style>
