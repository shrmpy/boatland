update = function() {
	// Choose target
lowhealth = filterEntities((findEntitiesInRange(ENEMY, BOT, false, 7)), [SORT_BY_DISTANCE], [SORT_ASCENDING]);
if (exists(lowhealth)) {
  if (willMeleeHit(lowhealth)) {
    if (canCloak() && !isCloaked()) {
      cloak();} else {
      if (canShield() && !isShielded()) {
        shield();}
      if (canReflect() && !isReflecting()) {
        reflect();}
    }
    if (canZap() && !isZapping()) {
      zap();}
    melee(lowhealth);} else {
    pursue(lowhealth)}
}
};

