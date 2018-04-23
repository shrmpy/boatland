init = function () {
    safex = 11;
    safey = 6;
    array1 = [];
    array1[0] = 0;
    healthA = life;
    healthZ = healthA;
};
update = function () {
    //do_pooper();
    do_scout();
};
do_scout = function () {
    healthZ = life;
    do_prioritizeEvade();
    if (array1[0] != 0){
        //serpentine!
        do_evade();
    } else {
        targ = do_search();
        do_walk(targ);
        if (canLayMine()) {
            layMine();
        }
    }
};
do_pooper = function () {
    healthZ = life;
    if (canLayMine()) {
        layMine();
    }

    //Loss health, under attack?
    if (healthZ < healthA) {
        do_evade();
    } else {
        targ = sharedE;

        if (!exists(targ) ||(getDistanceTo(targ) >= 4)){
            targ = findEntity(ENEMY, BOT, SORT_BY_DISTANCE, SORT_ASCENDING);
        }
        if (exists(targ)){
            pursue(targ);
        } else {
           do_walkupdown();
        }
    }
};

do_prioritizeEvade(){
        //Loss health, under attack?
        if (healthZ < healthA) {
            array2 = [];
            array2[0] = safex;
            array2[1] = safey;
            array1[1] = array2; //(x,y) destination
            array1[0] = 1; //keep index of priority
        }
};
do_walk = function(ent){
    if (!exists(ent)){
//        if (!areSensorsActivated()){
//                activateSensors();
//        }
        return;
    }
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
do_search = function(){
    targ = sharedE;

    if (!exists(targ)){
        targ = findEntity(ENEMY, BOT, SORT_BY_DISTANCE, SORT_ASCENDING);
    }

    return targ;
};
do_shield = function(){
    if (canCloak() && !isCloaked()){
        cloak();
    } else {
        if (canShield() && !isShielded()){
            shield();
        } else {
            if (canReflect() && !isReflecting()){
            reflect();
            }
        }
    }
};

/**
 * Last resort, idle
 */
do_walkupdown = function () {
    nx = x;
    ny = y;
    // evens, move down; odds move up
    if (x % 2 == 0) {
        ny = y + 1;
    } else {
        ny = y - 1;
    }
    if (canMoveTo(nx, ny)){
        moveTo(nx, ny);
    }
    //todo chk left boundary
    if (y == 0 || y == arenaHeight -1) {
        moveTo(x - 1, y);
    }
};
do_adjustHealthyVal = function(){
    //Initial health is gone, adjust undamaged value
    // to allow the under-attack check to compare hlth
    array1[0] = 0;
    healthA = life;
};
do_evade = function () {
    //todo-findEnemy-moveAway-or-move-toward-cpu
    i = array1[0]; //index to destination
    array2 = array1[i];
    dx = array2[0];
    dy = array2[1];
    do_shield();
    if (!isAttacker){
        if (x == dx && y == dy){
            //Finished retreat
            do_adjustHealthyVal();
        } else {
            //Run away to cpu
            moveTo(dx, dy);
        }
    } else {
        //Run to northwest corner
        moveTo(0,0);
    }
};

