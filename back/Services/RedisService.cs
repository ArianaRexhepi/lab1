using StackExchange.Redis;
using System.Text.Json;

namespace back.Services
{
    public class RedisService
    {
        private readonly IDatabase _database;
        private readonly IConnectionMultiplexer _redis;

        public RedisService(IConnectionMultiplexer redis)
        {
            _redis = redis;
            _database = redis.GetDatabase();
        }

        public async Task<T> GetAsync<T>(string key)
        {
            var value = await _database.StringGetAsync(key);
            if (value.IsNull)
                return default(T);

            return JsonSerializer.Deserialize<T>(value);
        }

        public async Task SetAsync<T>(string key, T value, TimeSpan? expiry = null)
        {
            var json = JsonSerializer.Serialize(value);
            await _database.StringSetAsync(key, json, expiry);
        }

        public async Task DeleteAsync(string key)
        {
            await _database.KeyDeleteAsync(key);
        }

        public async Task<bool> ExistsAsync(string key)
        {
            return await _database.KeyExistsAsync(key);
        }

        public async Task<IEnumerable<string>> GetKeysAsync(string pattern)
        {
            var server = _redis.GetServer(_redis.GetEndPoints().First());
            var keys = server.Keys(pattern: pattern);
            return keys.Select(k => k.ToString());
        }

        // Book analytics methods
        public async Task TrackBookViewAsync(int bookId, string bookTitle)
        {
            var key = $"book_views:{bookId}";
            var currentViews = await GetAsync<int>(key);
            await SetAsync(key, currentViews + 1, TimeSpan.FromDays(30));
        }

        public async Task TrackSearchQueryAsync(string query, int resultCount, long executionTimeMs)
        {
            var key = $"search_log:{DateTime.UtcNow:yyyyMMddHHmmss}";
            var searchLog = new
            {
                Query = query,
                ResultCount = resultCount,
                ExecutionTimeMs = executionTimeMs,
                Timestamp = DateTime.UtcNow
            };
            await SetAsync(key, searchLog, TimeSpan.FromDays(7));
        }

        public async Task TrackUserActivityAsync(string userId, string activity, object data = null)
        {
            var key = $"user_activity:{userId}:{DateTime.UtcNow:yyyyMMddHHmmss}";
            var activityLog = new
            {
                UserId = userId,
                Activity = activity,
                Data = data,
                Timestamp = DateTime.UtcNow
            };
            await SetAsync(key, activityLog, TimeSpan.FromDays(30));
        }

        public async Task<Dictionary<string, int>> GetPopularBooksAsync(int limit = 10)
        {
            var keys = await GetKeysAsync("book_views:*");
            var popularBooks = new Dictionary<string, int>();

            foreach (var key in keys.Take(limit))
            {
                var views = await GetAsync<int>(key);
                var bookId = key.Split(':')[1];
                popularBooks[bookId] = views;
            }

            return popularBooks.OrderByDescending(x => x.Value).ToDictionary(x => x.Key, x => x.Value);
        }

        public async Task<Dictionary<string, int>> GetSearchStatsAsync()
        {
            var keys = await GetKeysAsync("search_log:*");
            var stats = new Dictionary<string, int>
            {
                ["total_searches"] = keys.Count(),
                ["avg_execution_time"] = 0
            };

            if (keys.Any())
            {
                var totalTime = 0;
                foreach (var key in keys)
                {
                    var log = await GetAsync<dynamic>(key);
                    if (log != null)
                    {
                        // This would need proper deserialization in a real implementation
                        totalTime += 100; // Placeholder
                    }
                }
                stats["avg_execution_time"] = totalTime / keys.Count();
            }

            return stats;
        }
    }
}
