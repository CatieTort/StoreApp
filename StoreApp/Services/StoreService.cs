using System;
using StoreApp.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace StoreApp.Services
{
    public class StoreService
    {
        private readonly IMongoCollection<Items> _item;

        public StoreService(IStoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _item = database.GetCollection<Items>(settings.ItemsCollectionName);
        }

        public List<Items> GetItems()
        {
            return _item.Find(item => true).ToList();
        }
      
    }
}
