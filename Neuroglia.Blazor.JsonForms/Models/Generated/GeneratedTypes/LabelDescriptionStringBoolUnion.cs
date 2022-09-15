namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class LabelDescriptionStringBoolUnionJsonConverter : System.Text.Json.Serialization.JsonConverter<LabelDescriptionStringBoolUnion>
    {
        public override LabelDescriptionStringBoolUnion Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new LabelDescriptionStringBoolUnion { LabelDescriptionValue = System.Text.Json.JsonSerializer.Deserialize<LabelDescription>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new LabelDescriptionStringBoolUnion { StringValue = System.Text.Json.JsonSerializer.Deserialize<string>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new LabelDescriptionStringBoolUnion { BoolValue = System.Text.Json.JsonSerializer.Deserialize<bool>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, LabelDescriptionStringBoolUnion value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(LabelDescription)) { System.Text.Json.JsonSerializer.Serialize(writer, value.LabelDescriptionValue, options); return; }
            if (value.Type == typeof(string)) { System.Text.Json.JsonSerializer.Serialize(writer, value.StringValue, options); return; }
            if (value.Type == typeof(bool)) { System.Text.Json.JsonSerializer.Serialize(writer, value.BoolValue, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(LabelDescriptionStringBoolUnionJsonConverter))]
    struct LabelDescriptionStringBoolUnion
    {
        public System.Type? Type { get; set; }
        private LabelDescription? _labelDescriptionValue;
        public LabelDescription? LabelDescriptionValue
        {
            get => _labelDescriptionValue;
            set
            {
                ClearValue();
                _labelDescriptionValue = value;
                Type = typeof(LabelDescription);
            }
        }
        public static implicit operator LabelDescriptionStringBoolUnion(LabelDescription value) => new LabelDescriptionStringBoolUnion { LabelDescriptionValue = value };
        public static implicit operator LabelDescription?(LabelDescriptionStringBoolUnion value) => value.LabelDescriptionValue;

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
        public static implicit operator LabelDescriptionStringBoolUnion(string value) => new LabelDescriptionStringBoolUnion { StringValue = value };
        public static implicit operator string?(LabelDescriptionStringBoolUnion value) => value.StringValue;

        private bool? _boolValue;
        public bool? BoolValue
        {
            get => _boolValue;
            set
            {
                ClearValue();
                _boolValue = value;
                Type = typeof(bool);
            }
        }
        public static implicit operator LabelDescriptionStringBoolUnion(bool value) => new LabelDescriptionStringBoolUnion { BoolValue = value };
        public static implicit operator bool?(LabelDescriptionStringBoolUnion value) => value.BoolValue;

        public override string? ToString()
        {
            if (Type == typeof(LabelDescription)) return LabelDescriptionValue?.ToString();
            if (Type == typeof(string)) return StringValue?.ToString();
            if (Type == typeof(bool)) return BoolValue?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(LabelDescription)) return LabelDescriptionValue?.GetHashCode() ?? 0;
            if (Type == typeof(string)) return StringValue?.GetHashCode() ?? 0;
            if (Type == typeof(bool)) return BoolValue?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _labelDescriptionValue = default;
            _stringValue = default;
            _boolValue = default;
        }
    }
}
