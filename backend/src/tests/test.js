
const userService = require('../services/userService');
const solicitationService = require('../services/solicitationService');
const solicitationRepository = require('../repositories/solicitationRepository');
const mongooseUtil = require('../utils/mongooseUtil');
const objUtil = require('../utils/objUtil');

const customerData = {
  email:"test1@example.com",
  fullname:"Tester 1",
  password:"123",
  role:"0"
}

const walkerData = {
  email:"test2@example.com",
  fullname:"Tester 2",
  password:"123",
  role:"1"
}

describe('Full testing', () => {
  beforeEach(() => {
    console.log('Clearing test database...');
    mongooseUtil.deleteAll();
  });

  test('Test for all API restfull', async () => {
    await userService.add(customerData.email, customerData.password, customerData.fullname, customerData.role);
    let data1 = await userService.login(customerData.email, customerData.password);
    data1 = objUtil.mongoToJson(data1);
    

    await userService.add(walkerData.email, walkerData.password, walkerData.fullname, walkerData.role);
    let data2 = await userService.login(walkerData.email, walkerData.password);
    data2 = objUtil.mongoToJson(data2);
    console.log('role ',data2.role);
    await userService.completeProfile('Description ...', 22, '...', data2.token)
    expect(data1.token.length).toBe(64);
    expect(data2.token.length).toBe(64);

    //Add solicitation
    let solicitation = await solicitationService.add(data1.token,data2._id);
    solicitation = objUtil.mongoToJson(solicitation);
    expect(solicitation.to).toBe(data2._id);
    //deny solicitation 
    await solicitationService.reply(solicitation._id,0, data2.token);

    solicitation = await solicitationService.getBook(data1.token,solicitation._id);
    expect(solicitation.active).toBe(0);

    solicitation = await solicitationService.add(data1.token,data2._id);
    solicitation = objUtil.mongoToJson(solicitation);
    expect(solicitation.to).toBe(data2._id);
    await solicitationService.reply(solicitation._id,1, data2.token);
    //Get all awaiting

    let solicitations = await solicitationService.getAllAwaiting(data1.token);
    expect(solicitation.active).toBe(1);

    //accept solicitation
    solicitation = await solicitationService.getBook(data1.token,solicitation._id);
    expect(solicitation.active).toBe(1);

    // get all from a walker (active)
     solicitations = await solicitationService.getAllByTo(data2.token);
    console.log(solicitations)
    expect(solicitations.length).toBe(1);
    
    //cancel
    solicitation = await solicitationService.add(data1.token,data2._id);
    solicitation = objUtil.mongoToJson(solicitation);
    expect(solicitation.to).toBe(data2._id);
    await solicitationService.cancel(data2._id,data1.token);
    solicitation = await solicitationRepository.findById(solicitation._id);
    expect(solicitation).toBe(null);
    
  });


});
