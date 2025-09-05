using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace back.Services
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MongoDb");
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase("BookManagementSystem");
        }

        public IMongoCollection<BookAnalytics> BookAnalytics => _database.GetCollection<BookAnalytics>("BookAnalytics");
        public IMongoCollection<UserActivity> UserActivities => _database.GetCollection<UserActivity>("UserActivities");
        public IMongoCollection<SearchLog> SearchLogs => _database.GetCollection<SearchLog>("SearchLogs");
    }

    public class BookAnalytics
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("bookId")]
        public int BookId { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("viewCount")]
        public int ViewCount { get; set; }

        [BsonElement("searchCount")]
        public int SearchCount { get; set; }

        [BsonElement("favoriteCount")]
        public int FavoriteCount { get; set; }

        [BsonElement("lastViewed")]
        public DateTime LastViewed { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class UserActivity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("userId")]
        public string UserId { get; set; } = string.Empty;

        [BsonElement("userEmail")]
        public string UserEmail { get; set; } = string.Empty;

        [BsonElement("activityType")]
        public string ActivityType { get; set; } = string.Empty; // "search", "view", "favorite", "borrow"

        [BsonElement("bookId")]
        public int? BookId { get; set; }

        [BsonElement("bookTitle")]
        public string? BookTitle { get; set; }

        [BsonElement("searchTerm")]
        public string? SearchTerm { get; set; }

        [BsonElement("timestamp")]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [BsonElement("ipAddress")]
        public string? IpAddress { get; set; }

        [BsonElement("userAgent")]
        public string? UserAgent { get; set; }
    }

    public class SearchLog
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("searchTerm")]
        public string SearchTerm { get; set; } = string.Empty;

        [BsonElement("filters")]
        public Dictionary<string, object> Filters { get; set; } = new();

        [BsonElement("resultCount")]
        public int ResultCount { get; set; }

        [BsonElement("userId")]
        public string? UserId { get; set; }

        [BsonElement("timestamp")]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        [BsonElement("executionTimeMs")]
        public long ExecutionTimeMs { get; set; }
    }
}
