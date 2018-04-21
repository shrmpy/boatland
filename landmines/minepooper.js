init = function () {
    safex = 11;
    safey = 6;
    healthA = life;
    healthZ = healthA;
};

/**
 * Testing perimeter / evasion / ambush
 */
do_walkupdown = function () {
    nx = x;
    ny = y;
    // evens, move up; odds move down
    if (x % 2 == 0) {
        ny = y - 1;
    } else {
        ny = y + 1;
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
    	healthA = life;
};
do_evade = function () {
    //todo-findEnemy-moveAway-or-move-toward-cpu
    if (canReflect() && !isReflecting()){
        reflect();
    }
	if (!isAttacker){
        if (x == safex && y == safey){
            do_adjustHealthyVal();
        } else {
	    //Run away to cpu
    	moveTo(safex, safey);
        }
    } else {
        moveTo(0,0);
    }
};


update = function () {
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
