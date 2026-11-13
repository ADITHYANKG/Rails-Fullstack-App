require "test_helper"

class SubscribersControllerTest < ActionDispatch::IntegrationTest
  test "subscribes a new email and thanks the user" do
    assert_difference("Subscriber.count", 1) do
      post subscribers_path, params: { email: "fresh@example.com" }
    end
    assert_redirected_to root_path(anchor: "newsletter")
    assert_equal "success", flash[:newsletter]["type"]

    follow_redirect!
    assert_select "#newsletter [role=status]", text: /Thanks for subscribing!/
  end

  test "does not duplicate an existing subscriber" do
    assert_no_difference("Subscriber.count") do
      post subscribers_path, params: { email: " Existing@Example.com " }
    end
    follow_redirect!
    assert_select "#newsletter [role=status]", text: /already subscribed/
  end

  test "rejects an invalid email and keeps what was typed" do
    assert_no_difference("Subscriber.count") do
      post subscribers_path, params: { email: "not-an-email" }
    end
    follow_redirect!
    assert_select "#newsletter [role=alert]", text: /valid email address/
    assert_select "#newsletter input[type=email][value=?]", "not-an-email"
  end

  test "rejects a missing email" do
    assert_no_difference("Subscriber.count") do
      post subscribers_path
    end
    follow_redirect!
    assert_select "#newsletter [role=alert]"
  end
end
