probably don't need router, since we're not leaving main page

What data is persistent?
  prompts

scores persist from game to game
objects only need to persist through end of final round

each game creates a new room(socket io)

  each user connects to that socket

  users are sent same view each round, different data

how is data flowing?:


what is our server going to be doing?

data: sequelize or redis
server: express
views: react
?state: redux?

Streamers vote on timer,  would be cool to hook into twitch chat for voting


without hash, the backend does not know that we are making requests to the frontend

what views have state?
  draw
  comment
  host



what happens when we refresh the page?
  can send state object as json, store to client side local storage
  asks browser did I save anything?
  redux sticks them back into store- can go backwards into earlier states



I can potentially use redis, since most of my data wouldn't need to persist beyond
games.

If server dies, what would we lose?
  everything likely...

hierarchy of persistence:
Starting quotes- need to be each game
  throughout room- scores, users,
    throughout game- submissions
      throughout round-


Redis Notes:
Key: value store, can get exact value if know exact Key
  SET key "value"
    O(1) complexity
    Returns: status code: OK if correct,
    Null multibulk: if specified nx or xx and condition not met
  GET key "value"
    O(1) complexity
    get value of key,
      if doesn't exist, returns special value 'nil'
      if value is not string, returns error
    Return value: bulk reply

  INCR, INCRBY, DECR, DECRBY key int
    O(1)
    increment or decrement the key (by int)
    limited to 64 bit integer
    Return: integer after operation

    Why use INCR if you can just:
      x = GET count
      x++
      SET count x
    If multiple clients are using keys:
      usrAx = GET count
      usrBx = GET count
      usrAx ++
      usrBx ++
      usrAx SET count x
      usrBx SET count x
      count = 11, not 12
    INCR is an atomic operation

  DEL key key2 keyN
    0(1)
    removes key
    returns: number of keys removed (0 if none existed)

  EXPIRE key seconds
    O(1)
    sets a time limit on key, after time limit expires, key is deleted
    key with timeout= volatile
    return 1, if timeout set, 0 if doesnt exist or couldnt set

  TTL key
    returns remaining time to live, -1 if not going to expire, -2 if doesnt exist

  several more complex data structures
  Lists: ordered values
    can immediately use key with a list, as long as it doesn't already exist as different type

    RPUSH/LPUSH key string
      O(1)
      add string value to the head (rpush) or tail (lpush) of the list
      Returns status code

    LLEN key
      O(1)
      returns length of list at key, if no key, returns 0, if not list, returns error

    LRANGE key start end
      O(n) (n length of range)
      return elements of the list, start and end are 0 based indexes 0 is head, etc.
      indexes out of range dont throw errors, redis treats it like an empty list
      multi bulk reply
      LRANGE friends 0 -1 => 1) "Sam", 2) "Alice", 3) "Bob"

      LPOP/RPOP key
        O(1)
        remove first(L) or last (R) element of list
        returns removed element, or nil

    Sets: unordered, no repeats

      SADD- adds value to set
      SREM - removes from set
      SISMEMBER- checks if member of set (1) or not (0)
      SMEMBERS O(N)- returns list of memebers of set
      SUNION O(N)- combines sets, returns list of elements

    Sorted sets: use Z instead of S


