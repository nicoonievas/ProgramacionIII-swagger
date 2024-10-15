const userModel = require("../../models/user");
const pager = require("../../utils/pager");

async function createIfNotExists(decoded, response) {
    let user = await findOne(decoded.email)
    if(!user){
        user = {firtname:decoded.given_name, lastname: decoded.family_name ,email:decoded.email}
        await save(user)
    }
    return user   

}
async function findOneById(_id){
  return await userModel.findById(_id).exec()
}
async function findOne(email){
    return await userModel.findOne({email:email}).exec()
}

async function save(user){
    let _user = new userModel(user)  
    return await _user.save()
}

async function paginated(params) {
  // Inicializar perPage y page con valores predeterminados
  let perPage = params.perPage;
  let page = params.page; // Asegurarse de que page sea un número

  let filter = params.filter ? params.filter : {};
  let sort = params.sort ? params.sort : {};

  // Contar total de documentos que coinciden con el filtro
  let count = await userModel.countDocuments(filter);

  // Obtener datos paginados
  let data = await userModel.find(filter)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sort)
      .exec();

  // Retornar la respuesta paginada utilizando el pager
  return pager.createPager(page, data, count, perPage);
}
  
async function update(id, updatedUser) {
    return await userModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
  }
  
async function remove(id) {
      return await userModel.findOneAndDelete({ _id: id }).exec();
  }
  


module.exports = { createIfNotExists,findOneById, findOne, save, paginated, update, remove };