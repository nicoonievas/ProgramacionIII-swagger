const taskModel = require("../../models/task");
const pager = require("../../utils/pager");



async function findOneById(_id){
  return await taskModel.findById(_id).exec()
}


async function save(user){
    let _user = new taskModel(user)  
    return await _user.save()
}

async function paginated(params) {
  // Inicializar perPage y page con valores predeterminados
  let perPage = params.perPage;
  let page = params.page; // Asegurarse de que page sea un número

  let filter = params.filter ? params.filter : {};
  let sort = params.sort ? params.sort : {};

  // Contar total de documentos que coinciden con el filtro
  let count = await taskModel.countDocuments(filter);

  // Obtener datos paginados
  let data = await taskModel.find(filter)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sort)
      .populate("user")
      .exec();

  // Retornar la respuesta paginada utilizando el pager
  return pager.createPager(page, data, count, perPage);
}
  
async function update(id, updatedUser) {
    return await taskModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
  }
  
async function remove(id) {
      return await taskModel.findOneAndDelete({ _id: id }).exec();
  }
  


module.exports = { findOneById, save, paginated, update, remove };