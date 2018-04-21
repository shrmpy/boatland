init = function () {
    safex = 11;
    safey = 6;
};

update = function () {
    // Patrol bot - move along rails to guard (chips)
    do_scan(safex, safey);
    do_defend();
    do_patrol(safex, safey);
    ////            } else {
    ////                pursue(lowhealth);

};
/**
 * within attack range
 */
do_defend = function () {
    // Rely on non-patrol to chase
    do_support();
    t = do_target();
    if (!exists(t) || getLife(t) <1) {
        return;
    }

    if (willMeleeHit(t)) {
            do_shields();
            if (canZap() && !isZapping()) {
                zap();
            }
            melee(t);
    } else {
            if (willMissilesHit(t)) {
                fireMissiles(t);
            } else {
                if (willLasersHit(t)) {
                    fireLasers(t);
                }
                if (willArtilleryHit(t)) {
                    fireArtillery(t);
                }
            }
    }
};
do_shields = function () {
            if (canCloak() && !isCloaked()) {
                cloak();
            } else {
                if (canShield() && !isShielded()) {
                    shield();
                }
            }
};
do_target = function() {
    if (exists(sharedE) && getLife(sharedE) >0) {
        return sharedE;
    }
    return sharedD;
}
/**
 * Wait until corners to scan
 */
do_scan = function (ex, ey) {
    if (x == ex+1 && y == ey+2) {
        do_sharedA();
    }
    if (x == ex+1 && y == ey-2) {
        do_sharedA();
    }
    if (x == ex-1 && y == ey-2) {
        do_sharedA();
    }
    if (x == ex-1 && y == ey+2) {
        do_sharedA();
    }

};
/**
 * support team bots
 */
do_support = function () {
    // can we decision (lose-lose)
    t = findEntity(IS_OWNED_BY_ME, BOT, SORT_BY_LIFE, SORT_ASCENDING);
    if (canShield(t)) {
        shield(t);
    }
    if (willRepair(t) && getLife(t) <150) {
        repair(t);
    } else {
        // self-heal
        if (life <75 && percentChance(50) && willRepair()) {
            repair();
        }
    }
};
/**
 * don't repeat scans
 */
do_sharedA = function () {
    if (!exists(sharedE) || getLife(sharedE) <1) {
        sharedE = sharedD;
    }
    if (exists(sharedE) && getLife(sharedE) >0) {
        return;
    }
    if (!areSensorsActivated() && canActivateSensors()) {
        activateSensors();
    }
    sharedD = findEntity(ENEMY, BOT, SORT_BY_LIFE, SORT_ASCENDING);
};
/**
 * Move along rails to guard entity
 */
do_patrol = function (ex, ey) {
    lost = true;
    // walk north along east rail
    if (x == (ex+1) && y > (ey-2)) {
        move('up');
        lost = false;
    }
    // walk south along west rail
    if (x == (ex-1) && y < (ey+2)) {
        move('down');
        lost = false;
    }
    // walk east along south rail
    if (y == (ey+1) && x < (ex+2)) {
        move('right');
        lost = false;
    }
    // walk west along north rail
    if (y == (ey-2) && x > (ex-1)) {
        move('left');
        lost = false;
    }

    // arbitrary
    if (lost) {
        moveTo(ex+2, ey+2)
    }
};

