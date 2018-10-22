function find_by_prop(array, prop, prop_name) {
    var ind = -1;
    for (var k = 0; k < array.length; k++) {
        if (array[k][prop] == prop_name) {
            ind = k;
            break;
        }
    }
    return ind;
}

function Make_TR(matches) {
    var Tourn_table = [];
    for (var i = 0; i < matches.length; i++) {
        var t1 = matches[i]["home"];
        ind_buf = find_by_prop(Tourn_table, "name", t1);
        var t1_ind = Tourn_table.length;
        if (ind_buf == -1) {
            Tourn_table.push({ name: t1, games: 0, goals_for: 0, goals_against: 0, goals_difference: 0, wins: 0, draws: 0, losses: 0, points: 0, img: matches[i]["home_img"] });
        }
        else {
            t1_ind = ind_buf;
        }
        var t2 = matches[i]["away"];
        ind_buf = find_by_prop(Tourn_table, "name", t2);
        var t2_ind = Tourn_table.length;
        if (ind_buf == -1) {
            Tourn_table.push({ name: t2, games: 0, goals_for: 0, goals_against: 0, goals_difference: 0, wins: 0, draws: 0, losses: 0, points: 0, img: matches[i]["away_img"] });
        }
        else {
            t2_ind = ind_buf;
        }
        Tourn_table[t1_ind].games++;
        Tourn_table[t2_ind].games++;
        var g1 = matches[i]["score"].split('-')[0];
        var g2 = matches[i]["score"].split('-')[1];
        Tourn_table[t1_ind].goals_for += g1 - "0";
        Tourn_table[t2_ind].goals_for += g2 - "0";
        Tourn_table[t1_ind].goals_against += g2 - "0";
        Tourn_table[t2_ind].goals_against += g1 - "0";
        var diff = g1 - g2;
        Tourn_table[t1_ind].goals_difference += diff;
        Tourn_table[t2_ind].goals_difference -= diff;
        if (diff == 0) {
            Tourn_table[t1_ind].draws++;
            Tourn_table[t2_ind].draws++;
            Tourn_table[t1_ind].points++;
            Tourn_table[t2_ind].points++;
        }
        if (diff > 0) {
            Tourn_table[t1_ind].points += 3;
            Tourn_table[t2_ind].losses++;
            Tourn_table[t1_ind].wins++;
        }

        if (diff < 0) {
            Tourn_table[t2_ind].points += 3;
            Tourn_table[t1_ind].losses++;
            Tourn_table[t2_ind].wins++;
        }
    }
    Tourn_table.sort(byField("points", "goals_difference", "goals_for"));
    return Tourn_table;
}

function byField(field1, field2, field3) {
    return function (a, b) {
        if (a[field1] == b[field1]) {
            if (a[field2] == b[field2]) {
                if (a[field3] < b[field3]) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else {
                if (a[field2] < b[field2]) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
        }
        else {
            if (a[field1] < b[field1]) {
                return 1;
            }
            else {
                return -1;
            }
        }
    }
}