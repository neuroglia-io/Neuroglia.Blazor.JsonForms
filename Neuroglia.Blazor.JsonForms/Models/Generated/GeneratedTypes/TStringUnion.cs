namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class TStringUnionJsonConverter : System.Text.Json.Serialization.JsonConverter<TStringUnion>
    {
        public override TStringUnion Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new TStringUnion { TValue = System.Text.Json.JsonSerializer.Deserialize<T>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new TStringUnion { StringValue = System.Text.Json.JsonSerializer.Deserialize<string>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, TStringUnion value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(T)) { System.Text.Json.JsonSerializer.Serialize(writer, value.TValue, options); return; }
            if (value.Type == typeof(string)) { System.Text.Json.JsonSerializer.Serialize(writer, value.StringValue, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(TStringUnionJsonConverter))]
    struct TStringUnion
    {
        public System.Type? Type { get; set; }
        private T? _tValue;
        public T? TValue
        {
            get => _tValue;
            set
            {
                ClearValue();
                _tValue = value;
                Type = typeof(T);
            }
        }
        public static implicit operator TStringUnion(T value) => new TStringUnion { TValue = value };
        public static implicit operator T?(TStringUnion value) => value.TValue;

        private string? _stringValue;
        public string? StringValue
        {
            get => _stringValue;
            set
            {
                ClearValue();
                _stringValue = value;
                Type = typeof(string);
            }
        }
        public static implicit operator TStringUnion(string value) => new TStringUnion { StringValue = value };
        public static implicit operator string?(TStringUnion value) => value.StringValue;

        public override string? ToString()
        {
            if (Type == typeof(T)) return TValue?.ToString();
            if (Type == typeof(string)) return StringValue?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(T)) return TValue?.GetHashCode() ?? 0;
            if (Type == typeof(string)) return StringValue?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _tValue = default;
            _stringValue = default;
        }
    }
}
