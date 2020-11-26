// let object = {

// };
// let flag = object.Test || 0;
// object.Test = 123;
// let flag2 = object.Test || 0;
// console.log(flag);
// console.log(flag2);

/*
    学习持续进步，工资不断涨
*/

var Staff = function () {
    return {
        BelongConpamy: "Mysoft",
        Salary: 1000,
        SkillLevel: 0,
        Age: 20,
        YearOfWork: 1,
        Study: function () {
            this.SkillLevel++;
        },
        IsRetired: function () {
            return this.Age + this.YearOfWork > 30;
        }
    }
}
var Company = function (name) {
    var MyStaffs = [];
    return {
        Name: name,
        AddStaff: function (staff) {
            MyStaffs.push(staff);
            staff.YearOfWork == 0;
        },
        isMyStaff: function (staff) {
            //...
            return true;
        },
        RiseSalary: function (staff) {
            staff.Salary +=staff.SkillLevel*100;
        }
    }
}

var person = new Staff();
var mysoft = new Company();
mysoft.AddStaff(person);

while (mysoft.isMyStaff(person) && !person.IsRetired()) {
    person.Study();
    person.Study();
    person.Study();

    mysoft.RiseSalary(person);

    person.YearOfWork++;
}

console.log(person.Salary);
console.log(person.SkillLevel);