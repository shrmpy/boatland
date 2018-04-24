/* Seems to indicate faulty behavior in pursuit / entity-exists
   todo - collapse functions into one, update()
 */
init = function () {
    safex = 0;
    safey = 0;
    if (!isAttacker){
    safex = 11;
    safey = 6;
    }
    array1 = [];
    array1[0] = 0;
    healthA = life;
    healthZ = healthA;
};

update = function() {
  i = array1[0];
  if (i == 0){
    do_search();
  } else if (i == 2){
    do_battle();
  } else if (i == 3){
    do_whereabouts();
  }
};

do_search = function(){
  if (!areSensorsActivated()){
    activateSensors();
  }

  targ = filterEntities((findEntitiesInRange(ENEMY, BOT, false, 7)), [SORT_BY_DISTANCE], [SORT_ASCENDING]);
  if (exists(targ)){
    array1[2] = targ;
    array1[0] = 2;
  }
};
do_battle = function(){
  do_shield();
  targ = array1[2];
  if (willMeleeHit(targ)){
      do_punch();
  } else {
      pursue(targ);
  }
  if (!exists(targ)){
      array1[3] = targ;
      array1[0] = 3;
  }
};
do_whereabouts = function(){
  targ = array1[3];
  do_walk(targ);
  if (exists(targ)){
      array1[0] = 2;
  } else {
      array1[0] = 0;
  }
};
do_walk = function(ent){
    tx = getX(ent);
    ty = getY(ent);
    if (canMoveTo(tx, ty)){
                moveTo(tx, ty);
    } else {
        if (canMoveTo(tx +1, ty)){
                moveTo(tx +1, ty);
        } else {
            if (canMoveTo(tx, ty +1)){
                moveTo(tx, ty +1);
            } else {
                if (canMoveTo(tx, ty -1)){
                    moveTo(tx, ty -1);
                } else {
                    if (canMoveTo(tx -1, ty)){
                        moveTo(tx -1, ty);
                    }
                }
            }
        }
    }

};

do_punch = function(){
  if (canZap() && !isZapping()) {
        zap();
  }
  targ = array1[2];
  melee(targ);
};

do_shield = function(){
  if (canCloak() && !isCloaked()) {
      cloak();
  } else {
      if (canShield() && !isShielded()) {
        shield();
      } else {
        if (canReflect() && !isReflecting()) {
        reflect();
        }
      }
  }
};
