require "test_helper"

class SubscriberTest < ActiveSupport::TestCase
  test "valid with a normal email" do
    assert Subscriber.new(email: "new@example.com").valid?
  end

  test "stores email trimmed and lowercased" do
    subscriber = Subscriber.create!(email: "  Mixed.Case@Example.COM ")
    assert_equal "mixed.case@example.com", subscriber.email
  end

  test "requires an email" do
    subscriber = Subscriber.new(email: "")
    assert_not subscriber.valid?
    assert subscriber.errors.of_kind?(:email, :blank)
  end

  test "rejects invalid email formats" do
    [ "plainaddress", "missing-at.example.com", "@no-local-part.com", "spaces in@example.com" ].each do |bad|
      assert_not Subscriber.new(email: bad).valid?, "#{bad.inspect} should be invalid"
    end
  end

  test "rejects duplicates regardless of case" do
    duplicate = Subscriber.new(email: "EXISTING@example.com")
    assert_not duplicate.valid?
    assert duplicate.errors.of_kind?(:email, :taken)
  end
end
