<template>
  <div class="policy_wrapper">
    <div class="policy_body">
      <h1>{{ $t('terms.termsOfService') }}</h1>
      <p>{{ $t('terms.welcomeMessage') }}</p>
      <!-- 1 -->
      <h3> {{ $t('terms.article1Title') }}</h3>
      <p>{{ $t('terms.registrationProcess') }}</p>
      <p>{{ $t('terms.userEligibility') }}</p>
      <!-- 2-->
      <h3> {{ $t('terms.article2Title') }}</h3>
      <p>{{ $t('terms.legalUserStatus') }}</p>
      <p>{{ $t('terms.serviceCommencement') }}</p>
      <p>{{ $t('terms.userProvidedInformation') }}</p>
      <p>{{ $t('terms.dataIntegrity') }}</p>
      <p>{{ $t('terms.userResponsibilities') }}</p>
      <p>{{ $t('terms.maintenanceUpdates') }}</p>
      <p>{{ $t('terms.legalCompliance') }}</p>
      <!-- 3-->
      <h3> {{ $t('terms.article3Title') }}</h3>
      <p>{{ $t('terms.nationalLaws') }}</p>
      <p class="compact">{{ $t('terms.illegalActivities') }}</p>
      <p class="compact">{{ $t('terms.fraudTheft') }}</p>
      <p class="compact">{{ $t('terms.disruptionHacking') }}</p>
      <p class="compact">{{ $t('terms.illegalContent') }}</p>
      <p class="compact">{{ $t('terms.harmfulContent') }}</p>
      <p class="compact">{{ $t('terms.inciteIllegalActivities') }}</p>
      <p class="compact">{{ $t('terms.commercialUse') }}</p>
      <p>{{ $t('terms.infringement') }}</p>
      <p>{{ $t('terms.policiesLaws') }}</p>
      <p>{{ $t('terms.contentRemoval') }}</p>
      <p>{{ $t('terms.accountSuspension') }}</p>
      <!-- 4-->
      <h3> {{ $t('terms.article4Title') }}</h3>
      <p>{{ $t('terms.termsUpdate') }}</p>
      <!-- 5-->
      <h3> {{ $t('terms.article5Title') }}</h3>
      <p>{{ $t('terms.disputesResolution') }}</p>
      <p class="compact">{{ $t('terms.contactInformation') }}</p>
      <p class="compact">{{ $t('terms.company') }}</p>
      <p class="compact">{{ $t('terms.contact') }}</p>
      <p class="compact">{{ $t('terms.effectiveDate') }}</p>
      <p>{{ $t('terms.jurisdictionLaw') }}</p>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
@import url('./policy.scss');
</style>
