using System;
using StoreApp.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;


namespace StoreApp.Services
{
    public class StoreService
    {
        private readonly IMongoCollection<Items> _items;

        public StoreService(IStoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _items = database.GetCollection<Items>(settings.ItemsCollectionName);
        }

        public List<Items> GetItems()
        {
     
            return _items.Find(item => true).ToList();
           
        }

        public List<Items> GetMax()
        {
            var itemList = _items.AsQueryable().OrderByDescending(i => i.Price).ToList();
            var groupedList = itemList.GroupBy(i => i.Name).SelectMany(g => g).ToList();

            return groupedList;
        }

        public Items Create(Items item)
        {
            _items.InsertOne(item);
            return item;
        }

        public void Update(string id, Items itemChanged)
        {
            _items.ReplaceOne(item => item.Id == id, itemChanged);
        }

        public void Remove(Items itemRm)
        {
            _items.DeleteOne(item => item.Id == itemRm.Id);
        }

    }
}
