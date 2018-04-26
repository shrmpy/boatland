update = function() {

  nearest = filterEntities((findEntitiesInRange(ENEMY, BOT, false, 7)), [SORT_BY_DISTANCE], [SORT_ASCENDING]);

  if (exists(nearest)) {
    if (willMeleeHit(nearest) || isAdjacent(nearest) || getDistanceTo(nearest)<3) {

      if (canCloak() && !isCloaked()) {
        cloak();
      } else {
      if (canShield() && !isShielded()) {
        shield();}
      if (canReflect() && !isReflecting()) {
        reflect();}
      }

      if (canZap() && !isZapping()) {
      zap();}

      melee(nearest);
    } else {
      if (!areSensorsActivated()){
      activateSensors();
      }
      pursue(nearest);}
  }
};

