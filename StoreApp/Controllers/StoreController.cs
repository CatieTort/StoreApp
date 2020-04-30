using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StoreApp.Models;
using StoreApp.Services;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StoreApp.Controllers
{
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        private readonly StoreService storeService;

        public StoreController(StoreService storeService)
        {
            this.storeService = storeService;
        }

        // GET: api/store
        [HttpGet]
        public JsonResult Get()
        {
            return Json(storeService.GetItems());
        }

        // GET api/store/max
        [HttpGet("max")]
        public JsonResult GetMaxValues()
        {
            return Json(storeService.GetMax());
        }

        //GET api/store/name
        [HttpGet("{name}")]
        public JsonResult GetMaxItem([FromRoute]string name)
        {
            return Json(storeService.GetItemMax(name));
        }

        //TODO: Test Post/Put/Delete

        //POST
        [HttpPost]
        public void Post([FromBody]Items item)
        {
            storeService.Create(item);
        }

        // PUT api/store/`${id}`
        [HttpPut("{id}")]
        public void Put(string id, [FromBody]Items itemChanged)
        {
            storeService.Update(id, itemChanged);
        }

        // DELETE api/store/`${id}`
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            storeService.Remove(id);
        }
    }
}
