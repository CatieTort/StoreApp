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

        public List<Items> GetItemMax(string itemName)
        {
            var item = _items.Find(i => i.Name == itemName).ToList();

            if(item.Count <= 1)
            {
                return item == null ? null : item;
            }
            else
            {
                for (int i = 0; i < item.Count; i++)
                {
                    if (item[i].Price >= item[i + 1].Price)
                    {
                        item.Remove(item[i + 1]);
                    }
                    else
                    {
                        item.Remove(item[i]);
                    }
                }

                return item == null ? null : item;
            }
          
        }

    }
}
